import React, { useSatate, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/fp/startOfWeek/index.js";
import getDay from "date-fns/getDay";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useTitles } from "../hooks/useEventstitle";
import axios from "axios";
import {
  MdDoneAll,
  MdDelete,
  MdDeleteOutline,
  MdLibraryAdd,
} from "react-icons/md";
import iconsStyles from "../styles/icons.module.css";
import { useMutation, useQueryClient } from "react-query";
import useDeleteHook from "../hooks/useDeleteHook";
import changeingColorCustom from "../func/changeingColorCustom";

const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  getHours,
  getMinutes,
  getSeconds,
  locales,
});

// let formats ={
//   timeGutterFormat: (date, culture, localizer) =>
//         localizer.format(date, 'H:mm', culture),
// }

// var events = [
//     {
//         title: "some text",
//         allDay: true,
//         start: Date.now(),
//         end: Date.now(),
//         data: {
//             type: "Reg",
//         },
//     },
//     {
//       title: "lorem",
//       allDay: true,
//       start: Date.now("2023-05-29T18:30:00.000Z"),
//       end: Date.now("2023-05-29T18:30:00.000Z"),
//       data: {
//           type: "Reg",
//       },
//   },
//     {
//         title: "small meet",
//         allDay: true,
//         start: new Date(),
//         end: new Date(),
//         data: {
//             type: "App",
//         },
//     },
// ];

// const components = {
//   event: (props) => {
//     const eventType = props?.event?.data?.type;
//     console.log(props);
//     console.log(eventType);
//     switch (eventType) {
//       case "Reg":
//         // console.log(`${props.title}`)
//         return (
//           <div style={{ backgroundColor: "yellow", color: "white" }}>
//             <a href="/add-item">{props.title}</a>
//           </div>
//         );

//       case "App":
//         // console.log(`${props.title}`)
//         return (
//           <div style={{ backgroundColor: "red", color: "white" }}>
//             {props.title}
//           </div>
//         );
//       default:
//         return null;
//     }
//   },
// };

const onSuccess = (data) => {
  console.log(`Perform Side effects after data fetching`, data);
};

const onError = (error) => {
  console.log(`Perform Side effects after encountering an error`, error);
};

const Calenders = () => {
  const [changeColor, setChangeColor] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, isFetching } = useTitles(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    <h2>Loading....</h2>;
  }
  if (isError) {
    <h2>{error.message}</h2>;
  }

  var events = [
    {
      title: "some text",
      allDay: true,
      start: new Date("May 31 2023"),
      end: new Date("May 31 2023"),
      data: {
        type: "Reg",
      },
    },
    {
      title: "lorem",
      allDay: true,
      start: Date.now(),
      end: Date.now(),
      data: {
        type: "Reg",
      },
    },
    {
      title: "text",
      allDay: true,
      start: Date.now(),
      end: Date.now(),
      data: {
        type: "Reg",
      },
    },
    {
      title: "smallmeet",
      allDay: true,
      start: new Date(),
      end: new Date(),
      data: {
        type: "App",
      },
    },
  ];

  const Arr = data?.data.map((e) => {
    return e;
  });

  const { isLoading: isMutating, mutateAsync } = useMutation(
    "delete",
    useDeleteHook,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("titles");
      },
    }
  );

  const funcChangeColor = () => {
    setChangeColor(!changeColor);
  }

  const components = {
    event: (data, props) => {
      const eventType = data?.event?.title;
      const id = data?.event?.id;
      const title = data?.event.title;
      console.log("id--", id);

      return (
        <>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={funcChangeColor} className={iconsStyles.btn} >
              <MdDoneAll className={iconsStyles.tick} />
            </button>
            <h4>{eventType}</h4>
            <button
              isLoading={isMutating}
              onClick={async () => await mutateAsync({ id })}
              className={iconsStyles.btn}
            >
              <MdDeleteOutline className={iconsStyles.delete} />
            </button>
            {/* () => deletePost.mutate(id) */}
          </div>
        </>
      );
    },
  };

  

  return (
    <>
      <h1 style={{ textAlign: "center" }}>AweSome Do to List</h1>
      <br />
      <br />
      <div className={iconsStyles.link}>
        <Link to={"/add-item"} className={iconsStyles.links}>
          {" "}
          <MdLibraryAdd /> Add-New{" "}
        </Link>
      </div>
      <Calendar
        localizer={localizer}
        defaultView="week"
        views={["month", "week"]}
        components={components}
        events={Arr}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </>
  );
};

export default Calenders;
