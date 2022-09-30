export default function clickChannelTalk() {
  let w: any = window;
  if (w.ChannelIO) {
    w.ChannelIO("showMessenger");
  }
}
