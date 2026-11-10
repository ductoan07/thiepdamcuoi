import classNames from "classnames/bind";
import styles from "./intro.module.scss";
import images from "@/app/images";
import { motion } from "framer-motion";
import { useRef } from "react";
import { introSection, weddingInfo } from "@/app/configs/ui";

const cx = classNames.bind(styles);

// Nhịp xuất hiện mượt mà cho từng từ
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // Tăng nhẹ khoảng thời gian trễ giữa các từ
      delayChildren: 0.1,
    },
  },
};

// Loại bỏ filter: blur(), thay bằng hiệu ứng trượt mượt tối ưu cho GPU
const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 16,
    willChange: "transform, opacity" // Báo trước cho trình duyệt chuẩn bị GPU
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.1, 0.25, 1.0] // Cubic-bezier mượt hơn easeOut thông thường
    },
  },
};

function Intro({ handleOpen, name = "You" }) {
  const ref = useRef(null);

  // Tách từng TỪ (Word) thay vì từng KÝ TỰ (Char) để nhẹ DOM
  const renderAnimatedWords = (text) => {
    if (!text) return null;
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={wordVariants}
        style={{ display: "inline-block", marginRight: "0.25em" }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <div className={cx("wrapper")} ref={ref}>
      <div className={cx("block-wrapper")}>
        <div className={cx("block")}>
          <div className={cx("left")}>
            {/* Hiệu ứng chữ chạy xuất hiện mượt cho "SAVE THE DATE" */}
            <motion.p
              className={cx("header-text")}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {renderAnimatedWords("SAVE THE DATE")}
            </motion.p>

            <div className={cx("img-box")}>
              <img className={cx("img")} src={introSection.mainImage} alt="Wedding" />
            </div>
          </div>

          <div className={cx("right")}>
            <div className={cx("text-box")}>
              <p className={cx("date")}>
                {weddingInfo[0].time.full}
              </p>

              {/* Tên Cô dâu & Chú rể */}
              <motion.div
                className={cx("name-box")}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className={cx("name")} style={{ marginTop: "-40px" }}>
                  <motion.span variants={wordVariants} style={{ display: "inline-block" }}>
                    {introSection.brideFirstLetter}
                  </motion.span>
                </h3>
                <span className={cx("and")}></span>
                <h3 className={cx("name")} style={{ marginBottom: "-60px" }}>
                  <motion.span variants={wordVariants} style={{ display: "inline-block" }}>
                    {introSection.groomFirstLetter}
                  </motion.span>
                </h3>
              </motion.div>

              <div className={cx("dear-box")}>
                <p className={cx("dear")}>Thân mời </p>
              </div>
            </div>

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