export default function Title(props:any) {
    return (
        <h1 className="text-7xl font-bold text-center" style={{ color: "#FF6347", textShadow: "1px 1px 0 black" }}>
            {props.text}
        </h1>
    );
}
