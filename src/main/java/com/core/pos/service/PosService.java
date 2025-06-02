import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PosService {

    private final SalesTransactionRepository salesTransactionRepository;
    private final SalesDetailRepository salesDetailRepository;
    private final ProductRepository productRepository;
    private final EmployeeRepository employeeRepository;
    private final PartTimerRepository partTimerRepository;

    public void processTransaction(TransactionDTO dto) {
        SalesTransaction tx = new SalesTransaction();
        tx.setPaymentMethod(dto.getPaymentMethod());
        tx.setTransactionStatus(0); // 정상 거래 상태
        tx.setPaidAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        tx.setCreatedAt(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        // ... rest of the method ...
    }
} 