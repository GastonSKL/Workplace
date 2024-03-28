export interface Tarea {
    idTask: number;
    idUser: number;
    cat: number | null;
    pri: number | null;
    com: number | null;
    tit: string;
    des: string;
    fecEdi: string | null;
    fecCre: string | null;
    idUserNavigation: any | null;
}
