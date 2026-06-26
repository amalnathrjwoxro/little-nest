
import { ContactFormBlock } from "@/blocks/ContactFormBlock";
import { GalleryBlock } from "@/blocks/Gallery";
import { HeadingBlock } from "@/blocks/Heading";
import { ImageBlock } from "@/blocks/ImageBlock";
import { ParagraphBlock } from "@/blocks/Paragraph";
import { TwoColumnBlock } from "@/blocks/TwoColomn";
import type { CollectionConfig } from "payload";


export const Pages: CollectionConfig = {
    slug : 'pages',
    admin: {
        useAsTitle: 'title',

    },
    access: {
        read:() => true,

    },
    fields:[
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
        },
        {
            name: 'content',
            type: 'blocks',
            blocks: [
                HeadingBlock,
                ParagraphBlock,
                ImageBlock,
                TwoColumnBlock,
                GalleryBlock,
                ContactFormBlock

            ],
        },
    ],
}