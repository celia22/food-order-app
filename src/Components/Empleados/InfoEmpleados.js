// import React, { useState, useContext } from "react";
// import { Form } from "react-bootstrap";
// import { makeStyles } from "@material-ui/core/styles";
// import { context } from "../../Context/apiProvider";
// import Avatar from "@material-ui/core/Avatar";
// import "./empleados.css";
// // import {useParams} from 'react-router-dom'
// // import { CgEditFlipV } from 'react-icons/cg';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

// const InfoEmpleados = ({ empleado, props }) => {
//   const apiContext = useContext(context);
//   console.log("emplea", empleado);
//   console.log("props", props);
//   const classes = useStyles();

//   const [edit, setEdit] = useState(false);
//   const [clickServicio, setClickServicio] = useState(false);
//   const [clickHorario, setClickHorario] = useState(false);
//   const [clickInfo, setClickInfo] = useState(false);
//   const [firstName, setFirstName] = useState(
//     empleado.firstName ? empleado.firstName : ""
//   );
//   const [lastName, setLastName] = useState(
//     empleado.lastName ? empleado.lastName : ""
//   );
//   const [workingHours, setWorkingHours] = useState(
//     empleado.workingHours ? empleado.workingHours : ""
//   );
//   const [services, setServices] = useState(
//     empleado.services ? empleado.services : ""
//   );
//   const [info, setInfo] = useState(empleado.info ? empleado.info : "");

//   const handleClickServicio = () => {
//     setClickServicio(true);
//     setClickHorario(false);
//     setClickInfo(false);
//   };

//   const handleClickHorario = () => {
//     setClickHorario(true);
//     setClickServicio(false);
//     setClickInfo(false);
//   };

//   const handleClickInfo = () => {
//     setClickInfo(true);
//     setClickHorario(false);
//     setClickServicio(false);
//   };

//   return (
//     <div className="container-info">
//       <div className="d-flex justify-content-between align-items-center">
//         <div className="d-flex align-items-center">
//           <Avatar
//             alt={empleado.firstName}
//             src={empleado.img}
//             className={classes.large}
//           />
//           {!edit ? (
//             <p className="nombre-profile">{empleado.firstName}</p>
//           ) : (
//             <Form.Control
//               className="edit-name"
//               type="text"
//               value={empleado.firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           )}
//         </div>
//         <button className="btn-edit" onClick={() => setEdit(!edit)}>
//           Editar perfil
//         </button>
//       </div>
//       <hr />

//       <div>
//         <ul className="lista-servicios">
//           <li
//             className={clickServicio && "active"}
//             onClick={handleClickServicio}
//           >
//             Servicios
//           </li>
//           <li className={clickHorario && "active"} onClick={handleClickHorario}>
//             Horario laboral
//           </li>
//           <li className={clickInfo && "active"} onClick={handleClickInfo}>
//             Información personal
//           </li>
//         </ul>
//       </div>
//       <div>
//         {!edit ? (
//           clickHorario ? (
//             empleado.workingHours
//           ) : clickServicio ? (
//             empleado.services
//           ) : clickInfo ? (
//             empleado.firstName
//           ) : (
//             ""
//           )
//         ) : clickHorario ? (
//           <Form.Control
//             className="edit-name"
//             type="text"
//             value={empleado.horario}
//             onChange={(e) => setWorkingHours(e.target.value)}
//           />
//         ) : clickServicio ? (
//           <Form.Control
//             className="edit-name"
//             type="text"
//             value={empleado.servicio}
//             onChange={(e) => setServices(e.target.value)}
//           />
//         ) : (
//           clickInfo && (
//             <Form.Control
//               className="edit-name"
//               type="text"
//               value={empleado.info}
//               onChange={(e) => setInfo(e.target.value)}
//             />
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default InfoEmpleados;
