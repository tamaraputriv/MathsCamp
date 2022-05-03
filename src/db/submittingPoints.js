import Parse from "parse";

async function registerPoints(studentID, points) {
  const date = new Date().toLocaleDateString("dk");
  const point_schema = new Parse.Object("Points");

  point_schema.set("User_id", studentID);
  point_schema.set("Points", points);
  point_schema.set("Date_earned", date);

  await point_schema.save();
}

export { registerPoints };
