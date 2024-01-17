interface ObjDataInt {
  name: string,
  content: string
}

export interface BucketDataInt {
  bucketName: string,
  objects: ObjDataInt[]
}