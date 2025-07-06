export default (errors) => {
    return errors.issues.map(issue => {
        return { [issue.path.join("")]: issue.message }
    })
}