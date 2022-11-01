import { NewsEntity } from "../core/database/entities/news.entity"

export type NewsType = {
    lists?: Array<NewsEntity>;
}