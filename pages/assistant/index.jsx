import { useState, useRef, useEffect } from 'react'
import {
  Card, Input, Button, List, Typography, Space,
  Table, Divider, Layout, theme
} from 'antd'
import { SendOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown';
import '../index.css'

const { Title } = Typography
const { Content } = Layout;

export default function Index() {
  const [chatList, setChatList] = useState([
    {
      role: 'assistant',
      content: '🍇 你好！我是葡萄数据库AI助手',
    },
  ])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatList])

  const handleSend = async () => {
    if (!inputText.trim()) return
    const userMsg = { role: 'user', content: inputText.trim() }
    const newChat = [...chatList, userMsg]
    setChatList(newChat)
    setInputText('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newChat }),
      })

      const result = await res.json()
      if (result.success) {
        setChatList([...newChat, { role: 'assistant', content: result.content }])
      }
    } catch (err) {
      setChatList([
        ...newChat,
        { role: 'assistant', content: '请求失败，请稍后重试' },
      ])
    } finally {
      setLoading(false)
    }
  }
  const { token: { colorBorder } } = theme.useToken();

  return (
    <Content style={{ padding: '16px 48px', backgroundColor: colorBorder, minHeight: 'calc(100vh - 64px)' }}>
      <div className={'item-title '}>
        葡萄数据库 AI 助手
      </div>

      <Card
        style={{
          height: '75vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
      >
        <div style={{ flex: 1,  }}>
          <List
            dataSource={chatList}
            renderItem={(item) => (
              <List.Item
                style={{
                  justifyContent:
                    item.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: item.role === 'user' ? '#1677ff' : '#f5f5f5',
                    color: item.role === 'user' ? '#fff' : '#333',
                    whiteSpace: 'pre-wrap'
                  }}
                >

                  {item.content}
                </div>
              </List.Item>
            )}
          />
          <div ref={chatEndRef} />
        </div>

        <Space.Compact style={{ width: '100%', marginTop: 10 }}>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onPressEnter={handleSend}
            placeholder="例如：帮我筛选早熟葡萄、糖度大于18的品种"
            disabled={loading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={loading}
            onClick={handleSend}
          >
            发送
          </Button>
        </Space.Compact>
      </Card>
    </Content>
  )
}
