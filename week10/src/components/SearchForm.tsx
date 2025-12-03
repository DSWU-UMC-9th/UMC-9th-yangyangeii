import { memo } from "react";
import type { LanguageCode } from "../App";

interface SearchFormProps {
  query: string;
  includeAdult: boolean;
  language: LanguageCode;
  onChangeQuery: (value: string) => void;
  onToggleAdult: (checked: boolean) => void;
  onChangeLanguage: (value: LanguageCode) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForm = memo(function SearchForm({
  query,
  includeAdult,
  language,
  onChangeQuery,
  onToggleAdult,
  onChangeLanguage,
  onSubmit,
}: SearchFormProps) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="form-row form-row-top">
        <label className="field">
          <span className="field-label">영화 제목</span>
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
          />
        </label>

        <label className="field checkbox-row">
          <span className="field-label">옵션</span>
          <label className="field checkbox-field">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => onToggleAdult(e.target.checked)}
            />
            <span>성인 콘텐츠 표시</span>
          </label>
        </label>
      </div>

      <div className="form-row">
        <label className="field">
          <span className="field-label">언어</span>
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>
        </label>
      </div>

      <div className="form-row submit-row">
        <button type="submit" className="primary-button">
          검색하기
        </button>
      </div>
    </form>
  );
});
