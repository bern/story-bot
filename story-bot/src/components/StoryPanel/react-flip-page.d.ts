declare module "react-flip-page" {
  declare const FlipPage: import("react").ComponentType<{
    orientation: "vertical" | "horizontal";
    height: number;
    width: number;
  }>;
  export default FlipPage;
}
