import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
} from "react-accessible-accordion";

const AboutAccordion = () => {
   return (
      <div className="about__accordion accordion-about">
         <div className="accordion-about__title">
            <h3>Question - answer</h3>
         </div>
         <Accordion allowZeroExpanded>
            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Are your plants sold as they are in the photo?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  All artificial plants, planters are supplied as they are
                  presented in our catalog. Each living plant presented on the
                  site is unique and unrepeatable. The photo that we posted is
                  more of a guide for you than a clear standard. Wildlife has no
                  limits, so the size and shape of plants may vary slightly.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Are the final prices listed on the website? Are there any
                     discounts for customers?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  Our website shows retail prices. Depending on the volume and
                  specifics of the order, you may be provided with discounts
                  from the price on the site. Our managers will find an
                  individual approach to each client, so we recommend that you
                  send more detailed information about what you do and where you
                  will use our plants to our email address. The answer will not
                  be long in coming.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Does the plant size listed include the planter?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  The listed size on the site is the full size of the plant from
                  the bottom to the tallest or longest branch.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Does the price include flower pots, as in the photographs
                     in the catalog?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  Some artificial plants (shrubs, potted plants, trees) come in
                  black plastic shipping containers. In the "Flower
                  Arrangements" section, for some products, a flower pot is
                  included in the price. We make sure to include this
                  information in the product description. Live plants are always
                  delivered in shipping pots.
               </AccordionItemPanel>
            </AccordionItem>
         </Accordion>
      </div>
   );
};

export default AboutAccordion;
