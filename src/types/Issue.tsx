export interface Issue {
 id: string;
 title: string;
 description: string;
 image?: string;
 latitude?: number;
 longitude?: number;
 status: string;
 votes: number;
 priority?: string;
}
