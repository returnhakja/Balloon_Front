export const sendExit = (client, chatroomId, empInfo) => {
  client.send(
    '/app/chat/message',
    {},
    JSON.stringify({
      chatroomId: chatroomId,
      writer: empInfo,
      chatContent: empInfo.empName + '님이 방을 나가셨습니다',
    })
  );
};
