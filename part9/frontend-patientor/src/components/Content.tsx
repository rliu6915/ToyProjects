interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((coursePart, index) => (
        <p key={index}>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      ))}
      {/* <p>
        {props.courseParts[0].name} {props.courseParts[0].exerciseCount}
      </p>
      <p>
        {props.courseParts[1].name} {props.courseParts[1].exerciseCount}
      </p>
      <p>
        {props.courseParts[2].name} {props.courseParts[2].exerciseCount}
      </p> */}
    </div>
  )
};

export default Content;