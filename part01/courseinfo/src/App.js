function Header({ course }) {
  return <h1>{course.name}</h1>;
}

function Part({ part, exercise }) {
  return (
    <p>
      {part} {exercise}
    </p>
  );
}

function Content({ course }) {
  const [part1, part2, part3] = course.parts;
  return (
    <div>
      <Part part={part1.name} exercise={part1.exercises} />
      <Part part={part2.name} exercise={part2.exercises} />
      <Part part={part3.name} exercise={part3.exercises} />
    </div>
  )
}

function Total({ course }) {
  let total = course.parts[0].exercises + course.parts[1].exercises + course.parts[3].exercises;
  return <p>Number of exercises {total}</p>;
}

const App = () => {

  const course = {

    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      }
    ]

  };

  return (
    <div>
      <Header course={course} />
      <Content content={course} />
      <Total total={course} />
    </div>
  );
}

export default App