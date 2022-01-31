{{- $title := .Title -}}
{{ $title }}:
{{- range .Pages }}
  - {{ .Title -}}
{{ end }}
