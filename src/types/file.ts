export interface FileWithPath extends File {
  readonly path?: string
}
export type TFile = FileWithPath
