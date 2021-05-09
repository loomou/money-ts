export interface Tags {
  id: string | number,
  type: string,
  name: string,
  icon: string
}

export interface tagState {
  tagList: Tags[],
  currentTag: undefined | Tags,
  filterTag: undefined | Tags[],
  createTagType: string,
  showTip: Boolean,
}
