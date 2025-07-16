import { createStore } from "solid-js/store";
import TreeNavigator from "../TreeNavigator";
import "./App.css";

function App() {
    const [tree] = createStore([
        {
            title: "A",
            href: "/a",
            nodes: [
                { title: "a1", href: "/a/a1" },
                { title: "a2", href: "/a/a2", nodes: [{ "title": "b", href: "/a/a2/b" }] },
                { title: "a3", href: "/a/a3", nodes: [{ "title": "b", href: "/a/a3/b" }] }
            ],
        },
        {
            title: "B",
            href: "/b",
            nodes: [
                { title: "a1", href: "/b/a1" },
                { title: "a2", href: "/b/a2", nodes: [{ "title": "b", href: "/b/a2/b" }] },
                { title: "a3", href: "/b/a3", nodes: [{ "title": "b", href: "/b/a3/b" }] }
            ],
        }
    ]);
    return (
        <TreeNavigator nodes={() => tree} />
    )
}

export default App
