export default function BusinessTripForm(
  id,
  botInfo,
  approvalTitle,
  approvalForm,
  visitPlace,
  visitPurpose,
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
      'visitPlace' +
      '"' +
      ':' +
      '"' +
      visitPlace +
      '"' +
      ',' +
      '"' +
      'visitPurpose' +
      '"' +
      ':' +
      '"' +
      visitPurpose +
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
    status: 4,
  };
  return chatApproval;
}
