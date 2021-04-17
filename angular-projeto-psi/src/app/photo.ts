export interface Photo {
    description: string;
    photoBase64: string;
    image: HTMLImageElement;
    user_id: string;
    user: string;
    likes: number;
    posted_at: string;
}