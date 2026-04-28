import { useState, type ReactNode } from 'react'
import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd'
import './App.css'

function SourceCard(props: { title: string; children: ReactNode }) {
  return (
    <Card title={props.title}>
      <Typography.Paragraph>{props.children}</Typography.Paragraph>
    </Card>
  )
}

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <Layout className="app">
      <Layout.Content className="app-content">
        <Space className="app-stack" direction="vertical" size="large">
          <Typography>
            <Typography.Text type="secondary">@line-copy-open demo</Typography.Text>
            <Typography.Title>
              Use Option/Alt inspection to jump from browser UI to React source.
            </Typography.Title>
            <Typography.Paragraph>
              This page is intentionally made of several small React components so the
              inspector can show source file, line, and column data injected by{' '}
              <Typography.Text code>@line-copy-open/react</Typography.Text>.
            </Typography.Paragraph>
          </Typography>

          <Card title="Try it">
            <Space direction="vertical" size="middle">
              <Typography.Paragraph>
                Run the dev server, hold <Typography.Text code>Option</Typography.Text> on
                macOS or <Typography.Text code>Alt</Typography.Text> on Windows, then hover
                or long-press a card. Clicking a resolved component opens the source
                through <Typography.Text code>@line-copy-open/vite</Typography.Text>.
              </Typography.Paragraph>
              <Button type="primary" onClick={() => setClicks(clicks + 1)}>
                Click target: {clicks}
              </Button>
            </Space>
          </Card>

          <Row gutter={[16, 16]} aria-label="Inspectable React cards">
            <Col xs={24} md={8}>
              <SourceCard title="Vite plugin">
                Injects the browser client and handles the local open-editor request.
              </SourceCard>
            </Col>
            <Col xs={24} md={8}>
              <SourceCard title="React plugin">
                Adds debug source metadata before JSX is compiled by the React plugin.
              </SourceCard>
            </Col>
            <Col xs={24} md={8}>
              <SourceCard title="Editor command">
                This demo sets <Typography.Text code>editor: 'code'</Typography.Text>, so VS
                Code is used explicitly.
              </SourceCard>
            </Col>
          </Row>
        </Space>
      </Layout.Content>
    </Layout>
  )
}

export default App
