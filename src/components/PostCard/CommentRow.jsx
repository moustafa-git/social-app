import fallbackImg from "./../../assets/fallbackImg.webp";

function CommentRow({ comment }) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-3 items-center">
        <div className="">
          <div className=" avatar">
            <div className="w-8 h-8 rounded-full ">
              <img
                src={comment.commentCreator.photo}
                alt="Commenter"
                onError={(e) => (e.target.src = fallbackImg)}
              />
            </div>
          </div>
          <p>{comment.commentCreator.name} </p>
        </div>
        <div className="chat-bubble w-full">{comment.content}</div>
      </div>
    </div>
  );
}

export default CommentRow;
