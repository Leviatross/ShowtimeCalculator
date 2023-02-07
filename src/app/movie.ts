import { DateTime } from "aws-sdk/clients/devicefarm";

export interface Movie
{
    id: number
    title: string
    runtimeMinutes: number
    hours: number
    minutes: number
    dateAdded: DateTime
}