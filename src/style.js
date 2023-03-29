const styles = {
  boxWidth: "w-full",

  heading2:
    "font-poppins font-semibold xs:text-[45px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph:
    "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
};

export const layout = {
  section: `flex xl:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex xl:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} xl:mr-10 mr-0 xl:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} xl:ml-10 ml-0 xl:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
