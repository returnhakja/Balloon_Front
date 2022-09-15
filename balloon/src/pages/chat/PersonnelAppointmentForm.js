export default function PersonnelAppointmentForm(
  id,
  botInfo,
  approvalTitle,
  approvalForm,
  member,
  appointDepartment,
  appointPosition,
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
      'member' +
      '"' +
      ':' +
      '"' +
      member +
      '"' +
      ',' +
      '"' +
      'appointDepartment' +
      '"' +
      ':' +
      '"' +
      appointDepartment +
      '"' +
      ',' +
      '"' +
      'appointPosition' +
      '"' +
      ':' +
      '"' +
      appointPosition +
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
    status: 5,
  };
  return chatApproval;
}
