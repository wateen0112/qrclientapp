export const iconsData = [
  {
    iconName: "mdi-whatsapp",
    color: "#25D366",
    name: "Whatsapp",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-youtube",
    color: "#ab121f",
    name: "Youtube",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-snapchat",
    color: "#FFFC00",
    name: "snapchat",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-facebook",
    color: "#4267B2",
    name: "facebook",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-web",
    color: "gray",
    name: "web",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-twitter",
    color: "#4267B2",
    name: "twitter",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-instagram",
    color: "#8a3ae9",
    name: "instagram",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-send",
    color: "gray",
    name: "Telegram",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-alpha-t",
    color: "gray",
    name: "TikTok",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-baby-face",
    color: "gray",
    name: "Tripadvisor",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-alpha-v-circle",
    color: "gray",
    name: "VKontakte",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-volleyball",
    color: "gray",
    name: "Dribbble",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-facebook-messenger",
    color: "gray",
    name: "Messenger",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-message",
    color: "gray",
    name: "Line",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-leak-off",
    color: "gray",
    name: "Xing",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-alpha-t-circle",
    color: "gray",
    name: "Tumblr",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-led-strip-variant",
    color: "gray",
    name: "DoorDash",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-google-circles-extended",
    color: "gray",
    name: "Flickr",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-alpha-g-circle",
    color: "gray",
    name: "Grubhub",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-music-accidental-flat",
    color: "gray",
    name: "Uber Eats",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-checkbox-multiple-blank-circle",
    color: "gray",
    name: "OpenTable",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-bike",
    color: "gray",
    name: "Postmates",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-spotify",
    color: "gray",
    name: "Spotify",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-reddit",
    color: "gray",
    name: "Reddit",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-github",
    color: "#4267B2",
    name: "Github",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-vimeo",
    color: "#4267B2",
    name: "Vimeo",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-linkedin",
    color: "#4267B2",
    name: "Linkedin",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-soundcloud",
    color: "gray",
    name: "SoundCloud",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-music",
    color: "gray",
    name: "Apple Music",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-google",
    color: "gray",
    name: "Google Review",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-pinterest",
    color: "#ab121f",
    name: "Pinterest",
    text: "Werden Sie Fan"
  },
  {
    iconName: "mdi-skype",
    color: "#4267B2",
    name: "Skype",
    text: "Werden Sie Fan"
  },

];
export function getIconColor(icon: string) {
  var color = "#eee7";
  iconsData.forEach((item: any) => {
    if (item["iconName"] == icon) {
      color = item["color"];
    }
  });
  return color;
}
