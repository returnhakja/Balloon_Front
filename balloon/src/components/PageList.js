import { minusPage, plusPage } from "../context/BoardAxios";
import {
  Alignments,
  PageDiv,
  PageSpan,
  PaginationSpan,
  IButton,
} from "../styles/StyleMB";

function PageList({ boardList, page, setPage }) {
  return (
    <Alignments>
      <PageDiv>
        {boardList.page > 10 && boardList.prev && (
          <IButton
            onClick={() => {
              minusPage(page, setPage);
            }}
          >
            prev
          </IButton>
        )}
        {boardList.pageList &&
          boardList.pageList.map((number) => {
            return (
              <PageSpan key={number}>
                <PaginationSpan
                  id={number}
                  key={number}
                  onClick={(e) => {
                    setPage(e.target.id);
                  }}
                  aria-current={parseInt(page) === number ? "page" : null}
                >
                  {" "}
                  {number}{" "}
                </PaginationSpan>
              </PageSpan>
            );
          })}
        {!(boardList.end === boardList.totalPage) && boardList.next && (
          <IButton
            onClick={() => {
              plusPage(page, setPage, boardList.totalPage);
            }}
          >
            next
          </IButton>
        )}
      </PageDiv>
    </Alignments>
  );
}

export default PageList;
