import { int } from "aws-sdk/clients/datapipeline";
import { DateTime } from "aws-sdk/clients/devicefarm";

export interface Movie
{
    id: int
    title: string
    runtime: int
    hours: int
    minutes: int
    dateAdded: DateTime
}