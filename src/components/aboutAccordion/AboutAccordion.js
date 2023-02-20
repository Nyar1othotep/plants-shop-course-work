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
            <h3>ВОПРОС ОТВЕТ</h3>
         </div>
         <Accordion allowZeroExpanded>
            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Ваши растения продаются как на фото?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  Все искусственные растения, кашпо поставляются в том виде, в
                  каком они представлены в нашем каталоге. Каждое живое
                  растение, представленное на сайте, уникально и неповторимо.
                  Фото, которое мы разместили, является для вас скорее
                  ориентиром, чем четким эталоном. Дикая природа не имеет
                  ограничений, поэтому размер и форма растений могут
                  незначительно отличаться.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Окончательные цены указаны на сайте? Есть ли скидки для
                     клиентов?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  На нашем сайте указаны розничные цены. В зависимости от объема
                  и специфики заказа вам могут быть предоставлены скидки от цены
                  на сайте. Наши менеджеры найдут индивидуальный подход к
                  каждому клиенту, поэтому рекомендуем присылать более подробную
                  информацию о том, чем вы занимаетесь и где будете использовать
                  наши установки, на наш электронный адрес. Ответ не заставит
                  себя долго ждать.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Указанный размер растения включает в себя кашпо?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  Указанный размер на сайте – это полный размер растения от низа
                  до самой высокой или длинной ветки.
               </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
               <AccordionItemHeading>
                  <AccordionItemButton>
                     Входит ли в стоимость растений кашпо, как на фотографиях в
                     каталоге?
                  </AccordionItemButton>
               </AccordionItemHeading>
               <AccordionItemPanel>
                  Некоторые искусственные растения (кусты, горшечные, деревья)
                  поставляются в черных пластиковых транспортировочных кашпо. В
                  разделе «Цветочные композиции» у некоторых товаров кашпо
                  входит в стоимость. Мы обязательно указываем данную информацию
                  в описании к товару. Живые растения всегда поставляются в
                  транспортировочных кашпо.
               </AccordionItemPanel>
            </AccordionItem>
         </Accordion>
      </div>
   );
};

export default AboutAccordion;
