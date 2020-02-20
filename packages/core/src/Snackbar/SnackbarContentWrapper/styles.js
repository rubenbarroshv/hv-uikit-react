/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const styles = theme => ({
  root: {
    width: "310px",
    minHeight: "52px",
    maxHeight: "92px",
    padding: theme.spacing("xs")
  },
  success: {
    backgroundColor: theme.hv.palette.semantic.sema8
  },
  error: {
    backgroundColor: theme.hv.palette.semantic.sema9
  },
  default: {
    backgroundColor: theme.hv.palette.semantic.sema7
  },
  message: {
    padding: 0
  },
  messageSpan: {
    display: "table",
    minHeight: "32px",
    "& > *": {
      display: "table-cell",
      verticalAlign: "middle"
    }
  },
  messageText: {
    ...theme.hv.typography.normalText,
    padding: `0 ${theme.hv.spacing.xs}px`,
    color: theme.hv.palette.base.base2,
    fontFamily: theme.hv.typography.fontFamily,
    maxHeight: "72px"
  },
  action: {
    textAlign: "right"
  }
});

export default styles;
