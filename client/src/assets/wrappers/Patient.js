// import styled from "styled-components";

// const Wrapper = styled.table`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   width: 100%;
//   box-shadow: var(--shadow-2);
//   border-collapse: collapse;

//   th,
//   td {
//     padding: 1rem 1.5rem;
//     text-align: left;
//     border-bottom: 1px solid var(--grey-100);
//   }

//   tbody tr:hover {
//     background: var(--grey-200);
//   }

//   .status-กำลังรักษาอยู่,
//   .status-จบการรักษา {
//     border-radius: var(--border-radius);
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     text-align: center;
//     display: block;
//     padding: 0.5rem 1rem;
//     margin: 0.5rem auto;
//     width: fit-content;
//   }

//   .status-กำลังรักษาอยู่ {
//     background-color: #ffcccb; /* สีแดงอ่อน */
//     color: #842029;
//   }

//   .status-จบการรักษา {
//     background-color: #90ee90; /* สีเขียวอ่อน */
//     color: #0f5132;
//   }
//   /* สไตล์สำหรับปุ่มการจัดการ */
//   .actions .btn ,button {
//     display: block;
//     justify-content: center;
//     margin-left: auto;
//     margin-right: auto;
//     padding: 6px 6px;
//     text-decoration: none;
//     border-radius: 10px;
//     cursor: pointer;
//     font-size: 15px;
//     width: 80px;
//   }

//   .edit-btn {
//     background-color: #f1f1f1;
//     color: #21b814;
//     border: 1px solid #21b814;
//     margin-bottom: 5px;
//   }

//   .delete-btn {
//     background-color: #f1f1f1;
//     color: #ff6a6a;
//     border: 1px solid #ff6a6a;
//   }
// `;

// export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;


