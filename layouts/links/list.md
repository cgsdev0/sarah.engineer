{{- $title := .Title -}}
{{ range .Data.Pages.GroupByParam "Section" -}}
{{ .Key }}:
{{ range .Pages }}
  - [{{ .Title -}}]({{ .Params.href -}})
{{ end }}
{{ end }}
