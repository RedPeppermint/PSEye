export interface Photo {
    description: string;
    photoBase64: string;
    image: HTMLImageElement;
    user_id: string;
    user: string;
    number_of_likes: number;
    posted_at: string;
    liked: boolean;
}
