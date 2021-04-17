/**
 * format date to mm/dd/yyyy 
 * @param {*} date 
 * @returns 
 */
const formatDate = (date) => {

    let month = String(date.getMonth() + 1);
    let day = String(date.getDate() + 1);
    const year = String(date.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${month}/${day}/${year}`;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { formatDate }