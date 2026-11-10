import classNames from "classnames/bind";
import styles from "./intro.module.scss";
import images from "@/app/images";
import { motion } from "framer-motion";
import { useRef } from "react";
import { introSection, weddingInfo } from "@/app/configs/ui";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Tăng thời gian trễ giữa các chữ (cũ là 0.05)
      delayChildren: 0.15,
    },
  },
};

// Cấu hình chuyển động từng chữ cái (Thời gian chạy dài hơn để mượt và thong thả)
const letterVariants = {
  hidden: { 
    opacity: 0, 
    y: 12,
    willChange: "transform, opacity" 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.65, // Tăng thời gian fade-in & slide-up của mỗi chữ (cũ là 0.45)
      ease: [0.25, 0.1, 0.25, 1.0] 
    },
  },
};
const cx = classNames.bind(styles);


function Intro({ handleOpen, name = "You" }) {
  const ref = useRef(null);

  // Hàm hỗ trợ tách từng ký tự để chạy hiệu ứng nét chữ
  const renderAnimatedText = (text) => {
    if (!text) return null;
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        style={{ display: "inline-block", whiteSpace: "pre" }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className={cx("wrapper")} ref={ref}>
      <div className={cx("block-wrapper")}>
        <div className={cx("block")}>
          <div className={cx("left")}>
            {/* Hiệu ứng chữ chạy xuất hiện cho "SAVE THE DATE" */}
            <motion.p
              className={cx("header-text")}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {renderAnimatedText("SAVE THE DATE")}
            </motion.p>

            <div className={cx("img-box")}>
              <img className={cx("img")} src={introSection.mainImage} alt="Wedding" />
            </div>
          </div>

          <div className={cx("right")}>
            <div className={cx("text-box")}>
              <p
                className={cx("date")}
                style={{
                  fontFamily: "'Montserrat'",
                  fontSize: "2rem",
                  fontWeight: "500",
                }}
              >
                {weddingInfo[0].time.full}
              </p>

              {/* Hiệu ứng chữ chạy xuất hiện cho Tên Cô dâu & Chú rể */}
              <motion.div
                className={cx("name-box")}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className={cx("name")} style={{ marginTop: "-40px" }}>
                  {renderAnimatedText(introSection.brideFirstLetter)}
                </h3>
                <span className={cx("and")}></span>
                <h3 className={cx("name")} style={{ marginBottom: "-60px" }}>
                  {renderAnimatedText(introSection.groomFirstLetter)}
                </h3>
              </motion.div>

              <div className={cx("dear-box")}>
                <p className={cx("dear")}>Thân mời </p>
              </div>
            </div>

            {/* Nút bấm giữ nguyên kích thước lớn, dịch xuống và nhấp nháy cả khung */}
            <motion.button
              className={cx("btn")}
              style={{
                fontFamily: "'Montserrat'",
                fontWeight: 600,
                letterSpacing: "1px",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
            >
              Mở thiệp
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;