import branch from "../../resourses/img/branch.png";

const Description = () => {
   return (
      <section
         className="section description"
         id="description"
         style={{
            background: `url(${branch}) right center no-repeat`,
            backgroundSize: "",
         }}
      >
         <div className="description__container _container">
            <div className="description__body">
               <div className="description__content">
                  <div className="description__heading">
                     <h2>УКРАШАЙТЕ СВОЙ ДОМ РАСТЕНИЯМИ</h2>
                  </div>
                  <div className="description__text">
                     <p>
                        По мере того, как ночи становятся длиннее, привнесите в
                        спальню ощущение спокойствия с помощью растений. Висячие
                        растения, такие как золотой потос Рапунцель, добавляют
                        интереса на разной высоте и не возражают против
                        небольшой тени. Змеиное растение Сьюзи и мирная лилия
                        Пиппа имеют поразительную структуру и ночью выделяют
                        кислород - практичные и красивые.
                     </p>
                     <p>
                        Заполните пустые углы высокими тонкими растениями,
                        такими как атласный потос Сильви на моховом шесте или
                        филодендрон сканденс Фил. Минимум площади, максимум
                        эффекта.
                     </p>
                     <p>
                        Не забывайте свои горшки. Подходящие нейтральные горшки
                        будут выглядеть чистыми и элегантными, а сочетание
                        стилей и узоров выглядит эклектично и весело.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Description;
