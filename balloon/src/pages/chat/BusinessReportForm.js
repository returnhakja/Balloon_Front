export default function BusinessReportForm(
  id,
  botInfo,
  approvalTitle,
  approvalForm,
  empName,
  position
) {
  const chatApproval = {
    chatroomId: id,
    writer: botInfo,
    chatContent:
      '{' +
      '"' +
      'approvalTitle' +
      '"' +
      ':' +
      '"' +
      approvalTitle +
      '"' +
      ',' +
      '"' +
      'approvalForm' +
      '"' +
      ':' +
      '"' +
      approvalForm +
      '"' +
      ',' +
      '"' +
      'empName' +
      '"' +
      ':' +
      '"' +
      empName +
      '"' +
      ',' +
      '"' +
      'position' +
      '"' +
      ':' +
      '"' +
      position +
      '"' +
      '}',
    status: 3,
  };
  return chatApproval;
}
