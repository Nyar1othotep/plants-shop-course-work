import ReactFullpage from "@fullpage/react-fullpage";
import Preview from "../preview/Preview";
import Second from "../second/Second";
import Third from "../third/Third";

const anchors = ["PreviewPage", "DescriptionPage", "FeaturedPage"];

const App = () => {
   return (
      <ReactFullpage
         anchors={anchors}
			lockAnchors
         navigation
         navigationTooltips={anchors}
         sectionsColor={["#7fff00", "#00ffff", "#29ab87"]}
         render={() => {
            return (
               <div className="wrapper">
                  <Preview />
                  <Second />
                  <Third />
               </div>
            );
         }}
      />
   );
};
export default App;
