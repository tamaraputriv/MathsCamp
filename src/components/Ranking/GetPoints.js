import Parse from "parse";

async function GetPoints(studentid, filter) {
  function getWeek() {
    var date = new Date();
    let week = [];

    const first = date.getDate() - date.getDay() + 1;
    for (let j = 0; j < 6; j++) {
      var d = first + j;
      var da = new Date(date.setDate(d)).toLocaleDateString();
      week.push(da);
    }

    return week;
  }

  const st_id = studentid;
  let rank_points = 0;

  var today = new Date().toLocaleDateString();

  const point_schema = Parse.Object.extend("Points");
  const point_query = new Parse.Query(point_schema);
  point_query.equalTo("User_id", st_id);

  if (filter === "today") {
    point_query.equalTo("Date_earned", today);
  } else if (filter === "week") {
    const this_week = getWeek();
    point_query.greaterThanOrEqualTo("Date_earned", this_week[0]);
    point_query.lessThanOrEqualTo("Date_earned", this_week[6]);
  }

  const student_points = await point_query.find();

  student_points.map(function (obj) {
    rank_points += obj.get("Points");
  });

  return rank_points;
}

export { GetPoints };
