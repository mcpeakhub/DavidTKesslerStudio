import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Painting from "./pages/Painting";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Corporate from "./pages/Corporate";
import Museums from "./pages/Museums";
import SoloExhibitions from "./pages/SoloExhibitions";
import GroupExhibitions from "./pages/GroupExhibitions";
import PaintingOnMetal from "./pages/PaintingOnMetal";

export default function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/gallery/:id" element={<Gallery />} />
				<Route path="/painting/:id" element={<Painting />} />
				<Route path="/corporate" element={<Corporate />} />
				<Route path="/museums" element={<Museums />} />
				<Route path="/solo-exhibitions" element={<SoloExhibitions />} />
				<Route
					path="/group-exhibitions"
					element={<GroupExhibitions />}
				/>
				<Route
					path="/painting-on-metal"
					element={<PaintingOnMetal />}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Layout>
	);
}
