export const getDictLabel = (list, value, defaultLabel = '--') => {
    const temp = list.find((t) => t.code === value) || {}
    return temp.label || defaultLabel
}
