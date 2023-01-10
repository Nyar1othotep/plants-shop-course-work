import ReactFullpage from "@fullpage/react-fullpage";
import Preview from "../preview/Preview";
import Second from "../second/Second";
import Third from "../third/Third";

const anchors = ["PreviewPage", "DescriptionPage", "FeaturedPage"];

const App = () => (
   <ReactFullpage
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      sectionsColor={["#7fff00", "#00ffff", "#29ab87"]}
      render={() => {
         return (
            <div>
               <Preview />
               <Second />
               <Third />
            </div>
         );
      }}
   />
);
export default App;
