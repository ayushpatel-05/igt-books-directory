import bookCover from "../assets/BookCover.jpeg";

export default function BookListItem({
  name,
  author,
  publisher,
  genre,
  price,
}) {
  return (
    <>
      <div className="flex gap-5 mx-5 my-5">
        <img src={bookCover} alt="" className="w-2/6"></img>
        <div>
          <h1 className="font-bold text-xl">{name}</h1>
          <p>Author: {author}</p>
          <p>Publisher: {publisher}</p>
          <p>Genre: {genre}</p>
          <p>
            Price: <b>${price}</b>
          </p>
          <p>Description: {description}</p>
        </div>
      </div>
      <hr className="mt-5 bg-black"/>
    </>
  );
}

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula augue at ligula bibendum, id ullamcorper ipsum dictum. Integer maximus varius nisi in imperdiet. In pulvinar enim ut turpis egestas sollicitudin. Donec tempor ante non laoreet porta. Aenean eleifend erat ut dolor pellentesque maximus a id eros. Praesent in ante vitae turpis mattis vestibulum. Vestibulum interdum, quam sed interdum cursus, dui augue sodales libero, vitae efficitur ex metus id dui. ";
