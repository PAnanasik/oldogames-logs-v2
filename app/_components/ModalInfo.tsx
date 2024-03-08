"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Box, Info, Layout, Pyramid, Shield, Triangle } from "lucide-react";
import Image from "next/image";

const ModalInfo = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Info className={cn("h-9 w-9 p-2")} />
      </DialogTrigger>
      <DialogContent className="min-w-[80%] overflow-y-auto overflow-x-hidden max-h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex gap-x-2 items-center">
            <Info className="h-10 w-10 bg-link/20 p-2 rounded-full" />
            Гайд по использованию логов
          </DialogTitle>
          <DialogDescription>
            Здесь находится гайд по пользованию логов
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col gap-4 py-4 w-full h-full">
          <p className="text-white">
            Здравствуйте, дорогие друзья! Для того, чтобы максимально эффективно
            использовать логи, нужно знать, какие функции здесь вообще есть.
            Ниже как раз о них
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Layout className="h-4 w-4 text-link mr-1" />
              <h2 className="text-lg text-link font-medium">Интерфейс</h2>
            </div>

            <Image
              width={900}
              height={900}
              src={"/interface.png"}
              alt="Фото интерфейса"
              className="object-contain w-full h-auto"
            />
            <div className="text-white">
              Это интерфейс логов, который видите как вы, так и я. Здесь все
              просто!{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                Левая часть
              </span>{" "}
              отвечает за Sidebar - то есть боковую навигационную панель. Тут вы
              выбираете фильтры и режимы, а также видите свой профиль в самом
              низу.{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                Верхняя часть
              </span>{" "}
              - Navbar - то есть верхняя навигационная панель. Здесь вы
              фильтруете логи по тексту, открываете свою коробочку с логами, а
              также открываете модальное окно с этим гайдом. Есть еще иконочка
              щита, но она вам недоступна :){" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                Нижняя часть
              </span>{" "}
              - pagination - то есть пагинация. Здесь вы выбираете страничку с
              логами, листаете их и делаете тому подобные вещи
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Pyramid className="h-4 w-4 text-link mr-1" />
              <h2 className="text-lg text-link font-medium">Структура лога</h2>
            </div>

            <Image
              width={1100}
              height={1100}
              src={"/log-structure.png"}
              alt="Фото структуры лога"
              className="object-cover w-full h-auto"
            />
            <div className="text-white">
              Каждый лог можно поделить на три части: дата, основной текст,
              кнопка действия. Чтобы добавить лог в коробку, нужно нажать на
              плюсик. Если хочется только скопировать всю информацию лога, то
              жмем{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                ПКМ
              </span>{" "}
              и нажимаем на кнопку &quot;Скопировать&quot;. Если хочется точно
              представить, когда произошло событие - жмем на &quot;Посмотреть в
              календаре&quot;. Там нас встретит следующее меню
            </div>
            <Image
              width={1400}
              height={1400}
              src={"/context-menu.png"}
              alt="Фото контекстного меню лога"
              className="object-cover w-full h-auto"
            />
            <div className="text-white">
              Здесь{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                дата действия
              </span>{" "}
              выделена зеленым цветом фона, а{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                сегодняшняя дата
              </span>{" "}
              - просто зеленым цветом текста и небольшой обводочкой. Также при
              нажатии на{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                имя игрока
              </span>{" "}
              откроется небольшое меню со всей его статистикой на момент лога
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Box className="h-4 w-4 text-link mr-1" />
              <h2 className="text-lg text-link font-medium">Хранилище логов</h2>
            </div>
            <Image
              width={1100}
              height={1100}
              src={"/log-box.png"}
              alt="Фото хранилища логов"
              className="object-cover w-full h-auto"
            />
            <div className="text-white">
              Ну здесь все просто. Скопировать один лог - нажать на кнопку,
              расположенную справа в логе. Посмотреть инфу об игроке - нажать на
              его имя. Скопировать все логи, удалить все логи, расширить
              хранилище логов - панель снизу. Единственное, что важно отметить -{" "}
              <span
                className="text-link font-semibold md:text-md text-sm
            border border-white border-opacity-[0.1] p-1 rounded-md bg-primary w-max"
              >
                копирование логов
              </span>{" "}
              происходит сразу в формате ниже
            </div>
            <pre
              className="bg-primary text-white p-2 border border-white border-opacity-[0.1]
            overflow-x-auto"
            >
              ```<span className="text-link">js</span> <br />
              Mar 3, 15:12:08 [Игрок 1|&quot;var1&quot;: &quot;somevar&quot;,
              &quot;var2&quot;: 123] убил [Игрок 2|&quot;var1&quot;:
              &quot;somevar&quot;, &quot;var2&quot;: 123] <br />
              ```
            </pre>
            <p className="text-white">
              Так что у вас сразу будут отформатированные логи со всей
              информацией!
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Triangle className="h-4 w-4 text-link mr-1" />
              <h2 className="text-lg text-link font-medium">Итог</h2>
            </div>
            <p className="text-white">
              На этом гайд все. Теперь вам осталось отправиться в свободное
              плавание, чтобы самим разобраться с тем, что не совсем ясно.
              Удачи! Добро пожаловать в команду Triangle Union
            </p>
            <div className="w-full h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-link/50 to-primary rounded-md flex items-center justify-center select-none">
              <Image
                width={400}
                height={400}
                quality={100}
                src="/logo.png"
                alt="logo image"
                className="w-[150px] h-auto"
              />
            </div>
          </div>
        </section>
        <DialogFooter>
          <p className="text-secondary">made by PAnanasik, 2024</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInfo;
