const { PrismaClient } = require("@prisma/client");
const cloudinary = require('cloudinary').v2;
const { auth } = require("@clerk/clerk-sdk-node");
// const { requireAuth } =require('@clerk/express');
const prisma = new PrismaClient();


cloudinary.config({
    cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.PUBLIC_CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const video = async (req, res) => {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { createdAt: "desc" }
        }
        )
        console.log(videos)
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: "error while fetching videos" });
    }
}

const uplodad_image = async (req, res) => {
    const { userId } = auth();

    if (!userId) {
        res.status(400).json({ error: "Unauthorized" });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            res.status(400).json({ error: "File not found" })
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "cloudnary-uploads" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            )
            uploadStream.end(buffer);
        })

        res.status(200).json({ publicId: result.public_id });
    } catch (error) {
        console.log("upload iamge failed", error)
        res.status(500).json({ error: "upload iamge failed" });
    } finally {
        await prisma.$disconnect();
    }
}

const video_upload = async () => {
    try {
        const { userId } = requireAuth();

        if (!userId) {
            res.status(400).json({ error: "Unauthorized" });
        }

        if (!process.env.PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.PUBLIC_CLOUDINARY_API_KEY ||
            process.env.PUBLIC_CLOUDINARY_API_SECRET) {
            res.status(400).json({ error: "Cloudinary credentials not found" })
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const title = formData.get("title");
        const description = formData.get("description");
        const originalSize = formData.get("originalSize");

        if (!file) {
            res.status(400).json({ error: "File not found" })
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "cloudnary-uploads-video",
                    resource_type: "video",
                    transformation: [
                        { quality: "auto", fetch_format: 'mp4' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result)
                }
            )
            uploadStream.end(buffer);
        })

        const video = await prisma.video.create({
            data: {
                title,
                description,
                publicId: result.public_id,
                originalSize: originalSize,
                compressedSize: result.bytes,
                duration: result.duration || 0
            }
        })
        res.status(200).json(video)
    } catch (error) {
        console.log("upload video failed", error)
        res.status(500).json({ error: "upload video failed" });
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = {
    video, uplodad_image, video_upload
}