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

const getTemplate = (name, role) => {

    const template = `
"<div>
    <div style="margin-left:70px;margin-top:10px;font-size:20px;font-weight:bold;">
        ${name}
    </div>
    <div style="margin-left:70px;margin-top:3px;font-size:16px;">
            ${role}
    </div>
    <div style="margin-left:70px;margin-top:3px;font-size:14px;">
        Business first
    </div>
    <div style="margin-left:196px;margin-top:15px;font-size:13px;position:absolute;bottom:5px;">
        <div>
            ${role}
        </div>
        <div style="margin-top:5px">
            Corporate
        </div>
    </div>
</div>
`
    return template;


}


// eslint-disable-next-line import/no-anonymous-default-export
export default { formatDate, getTemplate }