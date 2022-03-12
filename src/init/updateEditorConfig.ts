import { writeFileSync } from 'fs';

const config = `root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
quote_type = single
`;

export function updateEditorConfig() {
  writeFileSync('.editorconfig', config);
}
